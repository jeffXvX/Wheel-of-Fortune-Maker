#!/strawberry/bin/perl
use strict;
use warnings;
use File::Slurp qw(read_file);

my $myname = read_file ("importfile.txt");

while ($myname =~ /\n/g) {	
		substr($myname,pos($myname)-3,3,chr(ord(substr($myname, pos($myname)-3))+0x80).chr(ord(substr($myname, pos($myname)-2))+0x80));
	}

while ($myname =~ /;/g) {
		substr($myname,pos($myname)-2,2,chr(ord(substr($myname, pos($myname)-2))+0x80));

	}
	

my $string = unpack ('H*', $myname);
my @bytes  = map { pack('C', hex($_)) } ($string =~ /(..)/g);
print @bytes;
